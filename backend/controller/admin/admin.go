package controller

import (
	"net/http"

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	_ "gorm.io/gorm"
)

func CreateAdmin(c *gin.Context) {
	var admin entity.Admin

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(admin.Password), 12)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	newAdmin := entity.Admin{
		
		Email:           admin.Email,
		Password:        admin.Password,
	}

	if _, err := govalidator.ValidateStruct(newAdmin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newAdmin.Password = string(hashPassword)
	if err := entity.DB().Create(&newAdmin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admin})

}

func GetAllAdmin(c *gin.Context) {
	// create variable for store data as type of TourType array
	var admins []entity.Admin

	// get data form database and check error
	if err := entity.DB().Find(&admins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// response data
	c.JSON(http.StatusOK, gin.H{"data": admins})
}
