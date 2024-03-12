package controller

import (
	"net/http"
	"github.com/asaskevich/govalidator"
	"github.com/NPimtrll/team12/entity"
	"github.com/gin-gonic/gin"
)

// CreatePayment ใช้สำหรับสร้างค่าใช้จ่ายใหม่
func CreatePayments(c *gin.Context) {
	var Payment entity.Payment
	var users entity.User
	var costs entity.Cost
	var rooms entity.Room
	// var users entity.User
	var paymentstatus entity.PaymentStatus
	// bind เข้าตัวแปร Cost
	if err := c.ShouldBindJSON(&Payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Cost ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.CostID).First(&costs); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cost not found"})
		return
	}
	// ค้นหา Room ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.RoomID).First(&rooms); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}
	// // ค้นหา User ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.UserID).First(&users); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	// ค้นหา paymentstatus ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.PaymentStatusID).First(&paymentstatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentStatus not found"})
		return
	}

	// สร้างค่าใช้จ่ายใหม่
	u := entity.Payment{
		Cost:           costs,
		User:           users,
		Room:           rooms,
		PaymentStatus:  paymentstatus,
		PaymentDate:    Payment.PaymentDate,
		PaymentEndDate: Payment.PaymentEndDate,
	}

	if _, err := govalidator.ValidateStruct(&Payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// บันทึกค่าใช้จ่ายใหม่ลงในฐานข้อมูล
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลค่าใช้จ่ายที่ถูกสร้างกลับไป
	c.JSON(http.StatusOK, gin.H{"data": u})
}



// GET /payment/:id
func GetPayment(c *gin.Context) {
	var Payment entity.Payment
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM payments  WHERE id = ?", id).Find(&Payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Payment})
}

func GetPaymentByUserID(c *gin.Context) {
	UserID := c.Param("UserID") // รับ studentID จาก URL parameter

	var payment entity.Payment

	// ดึงข้อมูลผู้ใช้จาก ID
	if result := entity.DB().Preload("PaymentStatus").Preload("Cost").Preload("Room").Order("created_at DESC").First(&payment, "user_id = ?", UserID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}

func ListPayments(c *gin.Context) {
	var payments []struct {
		entity.Payment
		RoomName          string  `json:"room_name"`
		TotalPrice        float32 `json:"total_price"`
		FirstName         string  `json:"first_name"`
		LastName          string  `json:"last_name"`
		StudentID         string  `json:"student_id"`
		PaymentStatusName string  `json:"payment_status_name"`
	}

	if err := entity.DB().
		Table("payments").
		Select("payments.*, rooms.room_name, costs.total_price, users.student_id, users.first_name, users.last_name , payment_statuses.payment_status_name").
		Joins("JOIN costs ON payments.cost_id = costs.id").
		Joins("JOIN users ON payments.user_id = users.id").
		Joins("JOIN rooms ON payments.room_id = rooms.id").
		Joins("JOIN payment_statuses ON payments.payment_status_id = payment_statuses.id").
		Order("payments.created_at DESC").
		Scan(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payments})
}

// // DELETE /Payments/:id
func DeletePayment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Payments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// // PATCH /Payments
func UpdatePayments(c *gin.Context) {
    var payment entity.Payment
    var result entity.Payment

    if err := c.ShouldBindJSON(&payment); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if tx := entity.DB().Where("id = ?", payment.ID).First(&result); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Payment not found"})
        return
    }

    // ไม่อัพเดตฟิลด์ "Slip" ด้วยการสร้าง map ที่มีฟิลด์ที่ต้องการอัพเดตเท่านั้น
    updateFields := map[string]interface{}{
        "PaymentDate": payment.PaymentDate,
        "PaymentEndDate": payment.PaymentEndDate,
		"CostID": payment.CostID,
		"UserID": payment.UserID,
		"RoomID": payment.RoomID,
		"PaymentStatusID": payment.PaymentStatusID,
        // เพิ่มฟิลด์อื่นๆ ที่ต้องการอัพเดตต่อไป
    }

    if err := entity.DB().Model(&result).Updates(updateFields).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": result})
}


func UpdateSlip(c *gin.Context) {
	var payment entity.Payment
	var result entity.Payment

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", payment.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payment not found"})
		return
	}

	// อัปเดตเฉพาะ Slip
	if err := entity.DB().Model(&result).Update("slip", payment.Slip).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": result})

}