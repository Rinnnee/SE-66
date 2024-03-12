package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/NPimtrll/team12/entity"
	
   
)


// GET /maintain-status
func GetMaintainStatusList(c *gin.Context) {
	var maintainStatusList []entity.MaintainStatus

	// Retrieve all MaintainStatus records from the database
	if err := entity.DB().Find(&maintainStatusList).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return a JSON response with the list of MaintainStatus
	c.JSON(http.StatusOK, gin.H{"data": maintainStatusList})
}

// GET /maintain-status/:id
func GetMaintainStatusByID(c *gin.Context) {
	var maintainStatus entity.MaintainStatus
	maintainStatusID := c.Param("id")

	// Retrieve the MaintainStatus record with the specified ID
	if err := entity.DB().First(&maintainStatus, maintainStatusID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}

	// Return a JSON response with the retrieved MaintainStatus data
	c.JSON(http.StatusOK, gin.H{"data": maintainStatus})
}
