package controller

import (

	"net/http"
	"github.com/NPimtrll/team12/entity"
	"github.com/gin-gonic/gin"
)

func GetAllDocumentType(c *gin.Context) {
	var documentTypes []entity.DocumentType

	if err := entity.DB().Find(&documentTypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": documentTypes})
}
