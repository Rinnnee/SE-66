package controller

import (
	"net/http"

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	_"github.com/go-playground/validator/v10"
)

// POST /Rooms
func CreateRoom(c *gin.Context) {
	var Room entity.Room
	var dormitory entity.Dormitory
	var roomstatus entity.RoomStatus
	var roomtypes entity.RoomType

	// bind เข้าตัวแปร Room
	if err := c.ShouldBindJSON(&Room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Dormitory ด้วย id
	if tx := entity.DB().Where("id = ?", Room.DormitoryID).First(&dormitory); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dormitory not found"})
		return
	}

	// ค้นหา Roomstatus ด้วย id
	if tx := entity.DB().Where("id = ?", Room.RoomStatusID).First(&roomstatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Roomstatus not found"})
		return
	}

	// ค้นหา RoomType ด้วย id
	if tx := entity.DB().Where("id = ?", Room.RoomTypeID).First(&roomtypes); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RoomType not found"})
		return
	}


	// สร้าง Room
	u := entity.Room{
		RoomType:   roomtypes,         //  โยงความสัมพันธ์กับ Entity RoomType
		RoomStatus:   roomstatus,       //  โยงความสัมพันธ์กับ Entity Roomstatus
		Dormitory:   dormitory,         // โยงความสัมพันธ์กับ Entity Dormitory
		Capacity: Room.Capacity,        // ตั้งค่าฟิลด์ Capacity
		RoomName:  Room.RoomName,       // ตั้งค่าฟิลด์ RoomName
		Price:     Room.Price,         // ตั้งค่าฟิลด์ Price
	
	}

	if _, err := govalidator.ValidateStruct(u) ;err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})
}

// GET /Room/:id
func GetRoom(c *gin.Context) {
	var Room entity.Room
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM rooms  WHERE id = ?", id).Find(&Room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Room})
}


// // GET /Room/:id
// func GetRoom(c *gin.Context) {
// 	var Room entity.Room
// 	id := c.Param("id")
// 	if err := entity.DB().Preload("Dormitory","Roomstatus","RoomType").Raw("SELECT * FROM Rooms WHERE id = ?", id).Find(&Room).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": Room})
// }

// // GET /Rooms
// func ListRooms(c *gin.Context) {
// 	var Rooms []entity.Room
// 	if err := entity.DB().Raw("SELECT * FROM Rooms").Find(&Rooms).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": Rooms})
// }

func ListRooms(c *gin.Context) {
    var rooms []struct {
        entity.Room
        DormitoryName string `json:"dormitory_name"`
        RoomTypeName  string `json:"room_type_name"`
		RoomStatusName string  `json:"room_status_name"`
    }

    if err := entity.DB().
        Table("rooms").
        Select("rooms.*, dormitories.dormitory_name, room_types.room_type_name ,room_statuses.room_status_name").
        Joins("JOIN dormitories ON rooms.dormitory_id = dormitories.id").
        Joins("JOIN room_types ON rooms.room_type_id = room_types.id").
		Joins("JOIN room_statuses ON rooms.room_status_id = room_statuses.id").
        Find(&rooms).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": rooms})
}

// DELETE /Rooms/:id
func DeleteRoom(c *gin.Context) {
	var Room entity.Room
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).Delete(&Room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Rooms
func UpdateRoom(c *gin.Context) {
	var Room entity.Room
	var result entity.Room

	if err := c.ShouldBindJSON(&Room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Room ด้วย id
	if tx := entity.DB().Where("id = ?", Room.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}

	if err := entity.DB().Save(&Room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Room})
}