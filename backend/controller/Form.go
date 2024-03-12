package controller

import (
	"net/http"

	"github.com/NPimtrll/team12/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Get Form Status
func GetFormStatus(c *gin.Context) {
	var statuses []entity.FormStatus
	query := "SELECT * FROM form_statuses WHERE deleted_at IS NULL"

	if err := entity.DB().Raw(query).Scan(&statuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statuses})
}

// Get Form Type
func GetFormType(c *gin.Context) {
	var formTypes []entity.FormType
	query := "SELECT * FROM form_types WHERE deleted_at IS NULL"

	if err := entity.DB().Raw(query).Scan(&formTypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": formTypes})
}

// Get Form Topic Type
func GetFormTopicType(c *gin.Context) {
	var formTopicTypes []entity.FormTopicType
	query := "SELECT * FROM form_topic_types WHERE deleted_at IS NULL"

	if err := entity.DB().Raw(query).Scan(&formTopicTypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": formTopicTypes})
}

// ///////////////////////////////////////////////////////////// Form ///////////////////////////////////////////////////////////////////////

// GET All Form
func GetAllForm(c *gin.Context) {
	var forms []entity.Form
	query := "SELECT * FROM forms WHERE deleted_at IS NULL"

	if err := entity.DB().Preload("Admin", func(db *gorm.DB) *gorm.DB {
		return db.Select("id, first_name, last_name") // ระบุ field ที่ต้องการให้แสดงจาก relation Admin
	}).Preload("FormType").Preload("FormStatus").Raw(query).Find(&forms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": forms})
}

// Get Form By ID
func GetFormByID(c *gin.Context) {
	var form entity.Form
	id := c.Param("id")

	if err := entity.DB().Preload("Admin").First(&form, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": form})
}

// Get Form Status 1
func GetFormStatus1(c *gin.Context) {
	var forms []entity.Form
	query := "SELECT * FROM forms WHERE deleted_at IS NULL AND form_status_id == 1"

	if err := entity.DB().Preload("Admin", func(db *gorm.DB) *gorm.DB {
		return db.Select("id, first_name, last_name") // ระบุ field ที่ต้องการให้แสดงจาก relation Admin
	}).Preload("FormType").Preload("FormStatus").Raw(query).Find(&forms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": forms})
}

// Get Form Status 2
func GetFormStatus2(c *gin.Context) {
	var forms []entity.Form
	query := "SELECT * FROM forms WHERE deleted_at IS NULL AND form_status_id == 2"

	if err := entity.DB().Preload("Admin", func(db *gorm.DB) *gorm.DB {
		return db.Select("id, first_name, last_name") // ระบุ field ที่ต้องการให้แสดงจาก relation Admin
	}).Preload("FormType").Preload("FormStatus").Raw(query).Find(&forms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": forms})
}

// Get Form Status 3
func GetFormStatus3(c *gin.Context) {
	var forms []entity.Form
	query := "SELECT * FROM forms WHERE deleted_at IS NULL AND form_status_id == 3"

	if err := entity.DB().Preload("Admin", func(db *gorm.DB) *gorm.DB {
		return db.Select("id, first_name, last_name") // ระบุ field ที่ต้องการให้แสดงจาก relation Admin
	}).Preload("FormType").Preload("FormStatus").Raw(query).Find(&forms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": forms})
}

// Create Form
func PostForm(c *gin.Context) {
	var form entity.Form

	if err := c.ShouldBindJSON(&form); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&form).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": form})

}

// Update Form Status
func UpdateFormStatus(c *gin.Context) {
	var form entity.Form

	formID := c.Param("id") // Assuming you have the form ID in the URL parameter

	if err := entity.DB().First(&form, formID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Form not found"})
		return
	}

	var updatedFormStatusID uint
	if err := c.ShouldBindJSON(&updatedFormStatusID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update the FormStatusID field
	form.FormStatusID = &updatedFormStatusID

	if err := entity.DB().Save(&form).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": form})
}

// Delete Form
func DeleteForm(c *gin.Context) {
	formID := c.Param("id")

	if err := entity.DB().Where("id = ?", formID).Delete(&entity.Form{}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Form id " + formID + " deleted successfully "})
}

// ///////////////////////////////////////////////////////////// Form Topic ///////////////////////////////////////////////////////////////////////
// GET All Form Topic
func GetAllFormTopic(c *gin.Context) {
	var formTopics []entity.FormTopic
	query := "SELECT * FROM form_topics WHERE deleted_at IS NULL"

	if err := entity.DB().Raw(query).Find(&formTopics).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": formTopics})
}

// Create Form Topic
func PostFormTopic(c *gin.Context) {
	var formTopic entity.FormTopic

	if err := c.ShouldBindJSON(&formTopic); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&formTopic).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": formTopic})

}

// Delete Form Topic
func DeleteFormTopic(c *gin.Context) {
	formTopicID := c.Param("id")

	if err := entity.DB().Where("id = ?", formTopicID).Delete(&entity.FormTopic{}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Form topic id " + formTopicID + " deleted successfully "})
}

// ///////////////////////////////////////////////////////////// Form Choice ///////////////////////////////////////////////////////////////////////
// GET All Form Choice
func GetAllFormChoice(c *gin.Context) {
	var formChoices []entity.FormChoice
	query := "SELECT * FROM form_choices WHERE deleted_at IS NULL"

	if err := entity.DB().Raw(query).Find(&formChoices).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": formChoices})
}

// Create Form Choice
func PostFormChoice(c *gin.Context) {
	var formChoice entity.FormChoice

	if err := c.ShouldBindJSON(&formChoice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&formChoice).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": formChoice})

}

// Delete Form Choice
func DeleteFormchoice(c *gin.Context) {
	formChoiceID := c.Param("id")

	if err := entity.DB().Where("id = ?", formChoiceID).Delete(&entity.FormChoice{}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Form choice id " + formChoiceID + " deleted successfully "})
}
