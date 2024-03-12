package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/NPimtrll/team12/entity"
)

// GET /dormitorys
func Listdormitorys(c *gin.Context) {
	var dormitorys []entity.Dormitory
	if err := entity.DB().Raw("SELECT * FROM dormitories").Scan(&dormitorys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dormitorys})
}

// GET /dormitory/:id
func GetDormitoryRooms(c *gin.Context) {
	id := c.Param("id")

	// ดึงข้อมูลห้องพักที่เกี่ยวข้องกับหอพัก
	var rooms []entity.Room
	if err := entity.DB().Raw("SELECT * FROM rooms WHERE dormitory_id = ?", id).Find(&rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, rooms)
}

