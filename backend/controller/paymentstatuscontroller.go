package controller

import (
	"net/http"
	"github.com/NPimtrll/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /paymentstatus
func Listpaymentstatus(c *gin.Context) {
	var paymentstatus []entity.PaymentStatus
	if err := entity.DB().Raw("SELECT * FROM payment_statuses").Scan(&paymentstatus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paymentstatus})
}