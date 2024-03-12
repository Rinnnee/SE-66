package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/NPimtrll/team12/entity"
)

// GET /roomstatus
func Listroomstatus(c *gin.Context) {
	var roomstatus []entity.RoomStatus
	if err := entity.DB().Raw("SELECT * FROM room_statuses").Scan(&roomstatus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roomstatus})
}