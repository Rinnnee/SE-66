package controller

import (
	"net/http"

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// CreateContactLog handles the creation of contact logs for users
func CreateContactLog(c *gin.Context) {

	studentID := c.Param("studentID")
	var contactLogInput entity.ContactLog

	if err := c.ShouldBindJSON(&contactLogInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(&contactLogInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the user exists
	var existingUser entity.User
	if result := entity.DB().First(&existingUser, "student_id = ?", studentID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Associate the contact log with the user
	contactLogInput.UserID = &existingUser.ID

	if err := entity.DB().Create(&contactLogInput).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create contact log"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Contact log created successfully"})
}

// DeleteContactLog handles the deletion of contact logs along with associated admin responses
func DeleteContactLog(c *gin.Context) {
	contactLogID := c.Param("contactLogID")

	// Check if the contact log exists
	var existingContactLog entity.ContactLog
	if result := entity.DB().First(&existingContactLog, "id = ?", contactLogID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Contact log not found"})
		return
	}

	// Delete the contact log along with associated admin responses
	if err := entity.DB().Where("id = ?", contactLogID).Delete(&existingContactLog).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete contact log"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Contact log deleted successfully"})
}

// backend/controller/contactcontroller.go
// ...

// CreateAdminResponse handles the creation of admin responses
func CreateAdminResponse(c *gin.Context) {
	adminID := c.Param("adminID")
	contactLogID := c.Param("contactLogID")

	var adminResponseInput entity.AdminResponse
	if err := c.ShouldBindJSON(&adminResponseInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the admin exists
	var existingAdmin entity.Admin
	if result := entity.DB().First(&existingAdmin, "id = ?", adminID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Admin not found"})
		return
	}

	// Check if the contact log exists
	var existingContactLog entity.ContactLog
	if result := entity.DB().First(&existingContactLog, "id = ?", contactLogID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Contact log not found"})
		return
	}

	// Set the AdminID and save the AdminResponse
	adminResponseInput.AdminID = &existingAdmin.ID
	if err := entity.DB().Create(&adminResponseInput).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create admin response"})
		return
	}

	// Now, you can set the ContactLogID in the existingContactLog and update it
	existingContactLog.AdminResponseID = &adminResponseInput.ID
	if err := entity.DB().Save(&existingContactLog).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update contact log with admin response"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Admin response created and associated with contact log successfully"})
}

func ViewAllContactLogs(c *gin.Context) {
	var contactLogs []entity.ContactLog

	if result := entity.DB().Preload("User").Preload("User.Room").Preload("AdminResponse").Preload("AdminResponse.Admin").Find(&contactLogs); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve contact logs"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": contactLogs})
}

func GetContactLogsByUserID(c *gin.Context) {
	var contactLogs []entity.ContactLog

	id := c.Param("id")

	if result := entity.DB().Where("user_id = ?", id).Preload("User").Preload("AdminResponse").Preload("AdminResponse.Admin").Find(&contactLogs); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve contact logs"})
		return
	}

	// ส่งข้อมูล Contact Logs กลับไปที่ client
	c.JSON(http.StatusOK, gin.H{"data": contactLogs})
}
