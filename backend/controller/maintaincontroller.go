package controller

import (
	"net/http"
	"github.com/asaskevich/govalidator"
	"github.com/NPimtrll/team12/entity"
	"github.com/gin-gonic/gin"
)

// POST /maintain
func CreateMaintain(c *gin.Context) {
	var maintain entity.Maintain
	var user entity.User
	var maintainStatus entity.MaintainStatus
	var maintainType entity.MaintainType
	var admin entity.Admin

	// Bind JSON data to the maintain variable
	if err := c.ShouldBindJSON(&maintain); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Search for a user with the specified ID
	if tx := entity.DB().Where("id = ?", maintain.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	// Search for a maintain status with the specified ID
	if tx := entity.DB().Where("id = ?", maintain.MaintainStatusID).First(&maintainStatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MaintainStatus not found"})
		return
	}

	// Search for a maintain type with the specified ID
	if tx := entity.DB().Where("id = ?", maintain.MaintainTypeID).First(&maintainType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MaintainType not found"})
		return
	}
	
	// Search for an admin with the specified ID
	//if tx := entity.DB().Where("id = ?", maintain.AdminID).First(&admin); tx.RowsAffected == 0 {
		//c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		//return
	//}

	// Create a new Maintain instance with the provided data
	maintainData := entity.Maintain{
		Title:            maintain.Title,
		Details:          maintain.Details,
		Image:            maintain.Image,
		Location:         maintain.Location,
		Contact:          maintain.Contact,
		Date:             maintain.Date,
		Annotation:       maintain.Annotation,
		Age: 			  maintain.Age,
		User:             user,
		MaintainStatus:   maintainStatus,
		MaintainType:     maintainType,
		Admin:            admin,  
	}
	if _, err := govalidator.ValidateStruct(maintainData) ;err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Save the new Maintain instance to the database
	if err := entity.DB().Create(&maintainData).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Return a JSON response with the created Maintain data
	c.JSON(http.StatusOK, gin.H{"data": maintainData})
}


// GET /maintains
func GetAllMaintain(c *gin.Context) {
	
	
	var maintains []entity.Maintain

	// Retrieve all Maintain records from the database
	if err := entity.DB().Preload("User").Preload("MaintainStatus").Preload("MaintainType").Find(&maintains).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return a JSON response with the retrieved Maintain data
	c.JSON(http.StatusOK, gin.H{"data": maintains})
}
func ListMaintain(c *gin.Context) {
    var maintains []struct {
        entity.Maintain
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		MaintainStatus string `json:"maintain_status_name"`

    }

    if err := entity.DB().
        Table("maintains").
        Select("maintains.*,users.student_id, users.first_name, users.last_name , maintain_statuses.maintain_status_name").
		Joins("JOIN users ON maintains.user_id = users.id").
		Joins("JOIN maintain_statuses ON maintains.maintain_status_id = maintain_statuses.id").
        Scan(&maintains).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": maintains})
}

// GET /maintain/:id
func GetMaintain(c *gin.Context) {
	var maintain entity.Maintain
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("MaintainStatus").Preload("MaintainType").Raw("SELECT * FROM maintains  WHERE id = ?", id).Find(&maintain).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": maintain})
}

// DELETE /maintain/:id
func DeleteMaintain(c *gin.Context) {
	var maintain entity.Maintain
	maintainID := c.Param("id")

	// Retrieve the Maintain record with the specified ID
	if err := entity.DB().First(&maintain, maintainID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}

	// Delete the Maintain record from the database
	if err := entity.DB().Delete(&maintain).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return a JSON response indicating successful deletion
	c.JSON(http.StatusOK, gin.H{"message": "Record deleted successfully"})
}

// PUT /maintain/:id
func UpdateMaintain(c *gin.Context) {
	var maintain entity.Maintain
	var result entity.Maintain
	var admin entity.Admin

	// Bind JSON data to the existingMaintain variable
	if err := c.ShouldBindJSON(&maintain); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Retrieve the existing Maintain record with the specified ID
	if tx := entity.DB().Where("id = ?", maintain.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Maintain not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", maintain.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}


	// Save the updated Maintain record to the database
	if err := entity.DB().Updates(&maintain).Where("id = ?", maintain.ID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Return a JSON response with the updated Maintain data
	c.JSON(http.StatusOK, gin.H{"data": maintain})
}


// PUT /maintainUser/:id
func UpdateMaintainUser(c *gin.Context) {
	var maintain entity.Maintain
	var result entity.Maintain
	var maintainType entity.MaintainType

	// Bind JSON data to the existingMaintain variable
	if err := c.ShouldBindJSON(&maintain); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Search for a maintain type with the specified ID
	if tx := entity.DB().Where("id = ?", maintain.MaintainTypeID).First(&maintainType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MaintainType not found"})
		return
	}
	// Retrieve the existing Maintain record with the specified ID
	if tx := entity.DB().Where("id = ?", maintain.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Maintain not found"})
		return
	}

	// Save the updated Maintain record to the database
	if err := entity.DB().Updates(&maintain).Where("id = ?", maintain.ID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	

	

	// Return a JSON response with the updated Maintain data
	c.JSON(http.StatusOK, gin.H{"data": maintain})
}