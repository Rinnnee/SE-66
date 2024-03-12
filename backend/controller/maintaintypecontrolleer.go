package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/NPimtrll/team12/entity"
	
   
)

// GET /maintain-type
func GetMaintainTypeList(c *gin.Context) {
	var maintainTypeList []entity.MaintainType

	// Retrieve all MaintainType records from the database
	if err := entity.DB().Find(&maintainTypeList).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return a JSON response with the list of MaintainType
	c.JSON(http.StatusOK, gin.H{"data": maintainTypeList})
}

// GET /maintain-type/:id
func GetMaintainTypeByID(c *gin.Context) {
    var maintainType entity.MaintainType
    maintainTypeID := c.Param("id")

    // ดึงข้อมูล MaintainType จากฐานข้อมูลโดยใช้ maintainTypeID

    if err := entity.DB().First(&maintainType, maintainTypeID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": maintainType})
}



