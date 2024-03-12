package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/NPimtrll/team12/entity"
)

// GET /roomtypes
func Listroomtypes(c *gin.Context) {
	var roomtypes []entity.RoomType
	if err := entity.DB().Raw("SELECT * FROM room_types").Scan(&roomtypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roomtypes})
}