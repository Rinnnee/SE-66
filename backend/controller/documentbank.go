package controller

import (

	"net/http"
	"github.com/NPimtrll/team12/entity"
	"github.com/gin-gonic/gin"
)

func GetAllDocumentBank(c *gin.Context) {
	// create variable for store data as type of TourType array
	var bank []entity.Bank

	// get data form database and check error
	if err := entity.DB().Find(&bank).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": bank})
}
