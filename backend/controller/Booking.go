package controller

import (
	_"fmt"
	"net/http"

	"github.com/NPimtrll/team12/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func BookingRoom(c *gin.Context) {
    var booking entity.Booking
    var dormitory entity.Dormitory
    var room entity.Room
    var user entity.User

    // ผูกข้อมูล JSON จากคำขอไปยังตัวแปร Booking
    if err := c.ShouldBindJSON(&booking); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // สืบค้นฐานข้อมูลเพื่อค้นหาหอพักด้วย ID ที่ระบุ
    if tx := entity.DB().Where("id = ?", booking.DormitoryID).First(&dormitory); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Dormitory not found"})
        return
    }

    // ค้นหาฐานข้อมูลเพื่อค้นหาห้องที่มี ID ที่ระบุ
    if tx := entity.DB().Where("id = ?", booking.RoomID).First(&room); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
        return
    }

    // ตรวจสอบว่าห้องเต็มหรือไม่
    if room.Occupancy >= room.Capacity {
        c.JSON(http.StatusBadRequest, gin.H{"error": "ห้องพักเต็มเเล้วไม่สามารถจองได้"})
        return
    }

    // ค้นหาฐานข้อมูลเพื่อค้นหาผู้ใช้ที่มี ID ที่ระบุ
    if tx := entity.DB().Where("id = ?", booking.UserID).First(&user); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
        return
    }

    // ตรวจสอบว่าผู้ใช้ได้จองห้องพักไว้แล้วหรือไม่
    existingBooking := entity.Booking{}
    if tx := entity.DB().Where("user_id = ?", booking.UserID).First(&existingBooking); tx.RowsAffected != 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "คุณใด้ทำการจองห้องพักไปเเล้วไม่สามารถจองห้องพักใด้อีกหากต้องการยกเลิกโปรดติดต่อเจ้าหน้าที่ที่เบอร์ 0982085653"})
        return
    }

     // ตรวจสอบว่าสถานะห้องไม่ว่างสำหรับการจอง (สมมติว่า RoomStatusID 2 ไม่ว่าง)
     if room.RoomStatusID != nil && *room.RoomStatusID == 2 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "ห้องกำลังปิดปรับปรุงอยู่"})
        return
    }

    // สร้างเอนทิตีการจองโดยอ้างอิงถึงห้อง ผู้ใช้ และหอพัก
    newBooking := entity.Booking{
        Room:      room,
        User:      user,
        Dormitory: dormitory,
    }

    // บันทึกเอนทิตีการจองลงในฐานข้อมูล
    if err := entity.DB().Create(&newBooking).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // อัพเดทจำนวนการเข้าใช้ห้อง
    entity.DB().Model(&room).Update("Occupancy", room.Occupancy+1)

    // Update the user's RoomID
    entity.DB().Model(&user).Update("RoomID", room.ID)

    // ส่งคืนการตอบสนอง JSON ด้วยเอนทิตีการจองที่สร้างขึ้น
    c.JSON(http.StatusOK, gin.H{"data": newBooking})
}

// // DELETE /BookingRoom/:id
func DeleteBookingRoom(c *gin.Context) {
	id := c.Param("id")
	// var User_id entity.User
    var booking entity.Booking
    
   
	// สืบค้นฐานข้อมูลเพื่อค้นหาการจองด้วย ID ที่ระบุ
	if err := entity.DB().Where("user_id = ?", id).First(&booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Booking not found"})
		return
	}

    // อัปเดตจำนวนผู้เข้าพักของห้องก่อนที่จะลบการจอง
	if err := entity.DB().Model(&entity.Room{}).
    Where("id = ?", booking.RoomID).Update("Occupancy", gorm.Expr("Occupancy - ?", 1)).Error; err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update room occupancy"})
    return
}

	// ลบการจองออกจากฐานข้อมูล
	if tx := entity.DB().Exec("DELETE FROM bookings WHERE User_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to delete booking"})
		return
	}

    

	c.JSON(http.StatusOK, gin.H{"data": id})
}



func GetUserBookings(c *gin.Context) {
    userID := c.Param("id") // รับค่า id ของผู้ใช้

    var currentUser entity.User
    if err := entity.DB().Where("id = ?", userID).Preload("Bookings").Preload("Bookings.Room").First(&currentUser).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
        return
    }

    // รับ room_id ของการจองของผู้ใช้ปัจจุบัน
    var roomID uint
    if len(currentUser.Bookings) > 0 && currentUser.Bookings[0].RoomID != nil {
        roomID = *currentUser.Bookings[0].RoomID
    } else {
        // ไม่มีการจองสำหรับผู้ใช้หรือ room_id เป็นศูนย์ โปรดจัดการกรณีนี้ตามความจำเป็น
        c.JSON(http.StatusOK, gin.H{"data": currentUser})
        return
    }

    // ตรวจสอบว่าห้องนั้นยังไม่ถูกลบ
    var room entity.Room
    if err := entity.DB().First(&room, "id = ? AND deleted_at IS NULL", roomID).Error; err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
    return
    }

   

    // ค้นหาผู้ใช้รายอื่นที่จองห้องพักเดียวกัน รวมถึงข้อมูลห้อง
    var otherUsers []entity.User
    if err := entity.DB().Joins("JOIN bookings ON bookings.user_id = users.id").
        Joins("JOIN rooms ON rooms.id = bookings.room_id"). // Join with the Room table
        Where("bookings.room_id = ? AND users.id != ?", roomID, userID).
        Preload("Bookings").Preload("Bookings.Room").
        Find(&otherUsers).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Error fetching other users"})
        return
    }

    // ดึงข้อมูลผู้ใช้ที่เกี่ยวข้องมาแสดง
    var userData []gin.H
    for _, user := range append(otherUsers, currentUser) {
        userData = append(userData, gin.H{
            "ID":        user.ID,
            "FirstName": user.FirstName,
            "LastName":  user.LastName,
            "StudentID": user.StudentID,
            "RoomName":  user.Bookings[0].Room.RoomName, // Access RoomName from the joined Room
        })
    }

    c.JSON(http.StatusOK, gin.H{"data": userData})
}







