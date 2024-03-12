package controller

import (
	"net/http"
	
	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	// "golang.org/x/crypto/bcrypt"
)

// CreateCost ใช้สำหรับสร้างค่าใช้จ่ายใหม่
func CreateCost(c *gin.Context) {
	var Cost entity.Cost
	var rooms entity.Room

	// bind เข้าตัวแปร Cost
	if err := c.ShouldBindJSON(&Cost); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Room ด้วย id
	if tx := entity.DB().Where("id = ?", Cost.RoomID).First(&rooms); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}

	// สร้างค่าใช้จ่ายใหม่
	u := entity.Cost{
		Room:  rooms,    //  โยงความสัมพันธ์กับ Entity Room
		ElectricityBill: Cost.ElectricityBill,
		WaterBill:       Cost.WaterBill,
		TotalPrice:      Cost.TotalPrice,
	}

	if _, err := govalidator.ValidateStruct(&Cost); err != nil {
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
// GET /Cost/:id
func GetCost(c *gin.Context) {
	var Cost entity.Cost
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM costs  WHERE id = ?", id).Find(&Cost).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Cost})
}

func ListCosts(c *gin.Context) {
    var costs []struct {
        entity.Cost
        RoomName string `json:"room_name"`
        Price    string `json:"price"`
    }

    if err := entity.DB().
        Table("costs").
        Select("costs.*, rooms.room_name, rooms.price ").
        Joins("JOIN rooms ON costs.room_id = rooms.id").
        Scan(&costs).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": costs})
}


// DELETE /Costs/:id
func DeleteCost(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Costs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cost not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Costs
func UpdateCosts(c *gin.Context) {
	var cost entity.Cost
	var result entity.Cost

	if err := c.ShouldBindJSON(&cost); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}


	
	if tx := entity.DB().Where("id = ?", cost.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cost not found"})
		return
	}

	if err := entity.DB().Save(&cost).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cost})
}

// func UpdateCosts(c *gin.Context) {
// 	var cost entity.Cost
// 	CostID := c.Param("id")

// 	// Retrieve the existing Maintain record with the specified ID
// 	if err := entity.DB().Preload("User").Preload("MaintainStatus").Preload("MaintainType").Preload("Admin").First(&cost, CostID).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
// 		return
// 	}

// 	// Bind JSON data to the existingMaintain variable
// 	if err := c.ShouldBindJSON(&cost); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// Save the updated Maintain record to the database
// 	if err := entity.DB().Save(&cost).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// Return a JSON response with the updated Maintain data
// 	c.JSON(http.StatusOK, gin.H{"data": cost})
// }