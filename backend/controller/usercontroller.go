package controller

import (
	"net/http"

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(c *gin.Context) {
	var user entity.User
	var studentIDCheck entity.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("student_id = ?", user.StudentID).First(&studentIDCheck); !(tx.RowsAffected == 0) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "StudentID นี้ถูกใช้ไปแล้ว"})
		return
	}

	// สร้าง password จาก citizenID
	user.Password = user.CitizenID

	// validate user
	if _, err := govalidator.ValidateStruct(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// hashing after validate
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 12)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	user.Password = string(hashPassword)

	if err := entity.DB().Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}

func CreateAddress(c *gin.Context) {
	studentID := c.Param("studentID") // รับ studentID จาก URL parameter

	var addressInput entity.Address
	if err := c.ShouldBindJSON(&addressInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่ามี user นี้ในระบบหรือไม่
	var existingUser entity.User
	if result := entity.DB().First(&existingUser, "student_id = ?", studentID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// เพิ่ม address ลงในฐานข้อมูล
	if err := entity.DB().Create(&addressInput).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create address"})
		return
	}

	// เชื่อม address_id กับ user
	existingUser.AddressID = &addressInput.ID
	if err := entity.DB().Save(&existingUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user with address"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Address created and associated with the user successfully"})
}

func UpdateUser(c *gin.Context) {
	studentID := c.Param("studentID") // รับ studentID จาก URL parameter

	var userInput entity.User
	if err := c.ShouldBindJSON(&userInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่ามี user นี้ในระบบหรือไม่
	var existingUser entity.User
	if result := entity.DB().Preload("Address").First(&existingUser, "student_id = ?", studentID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// ทำ hashing password
	if userInput.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userInput.Password), 12)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return
		}
		userInput.Password = string(hashedPassword)
	}

	// อัพเดทข้อมูล user
	entity.DB().Model(&existingUser).Updates(&userInput)

	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
}

func UpdateAddress(c *gin.Context) {
	studentID := c.Param("studentID") // รับ studentID จาก URL parameter

	var addressInput entity.Address
	if err := c.ShouldBindJSON(&addressInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่ามี user นี้ในระบบหรือไม่
	var existingUser entity.User
	if result := entity.DB().Preload("Address").First(&existingUser, "student_id = ?", studentID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// อัพเดทข้อมูล address
	entity.DB().Model(&existingUser.Address).Updates(&addressInput)

	c.JSON(http.StatusOK, gin.H{"message": "Address updated successfully"})
}

func GetAllUser(c *gin.Context) {
	var users []entity.User

	// ดึงข้อมูลทั้งหมดของผู้ใช้
	if result := entity.DB().Preload("Address").Preload("BloodType").Preload("Major").Preload("Room").Find(&users); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": users})
}

func GetAllMajor(c *gin.Context) {
	var majors []entity.Major

	// ดึงข้อมูลทั้งหมดของผู้ใช้
	if result := entity.DB().Find(&majors); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to fetch majors"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": majors})
}

func GetAllBloodType(c *gin.Context) {
	var bloodTypes []entity.BloodType

	// ดึงข้อมูลทั้งหมดของผู้ใช้
	if result := entity.DB().Find(&bloodTypes); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to fetch bloodtypes"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bloodTypes})
}

func GetUserByStudentID(c *gin.Context) {
	studentID := c.Param("studentID") // รับ studentID จาก URL parameter

	var user entity.User

	// ดึงข้อมูลผู้ใช้จาก ID
	if result := entity.DB().Preload("Address").Preload("BloodType").Preload("Major").Preload("Room").First(&user, "student_id = ?", studentID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func DeleteUser(c *gin.Context) {
	studentID := c.Param("studentID") // Get studentID from URL parameter

	// Check if the user exists
	var existingUser entity.User
	if result := entity.DB().Preload("Address").Preload("BloodType").Preload("Major").First(&existingUser, "student_id = ?", studentID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Delete the user
	if err := entity.DB().Delete(&existingUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}
