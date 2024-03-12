package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type DocumentUpdate struct {
	gorm.Model
	Tel                 string `valid:"matches(^[0]\\d{9}$)~PhoneNumber length is not 10 digits."`
	BankNumber          string	`valid:"stringlength(10|10)~BankNumber length is not 10 digits."`
	RoomBill            float64  `gorm:"default:0" valid:"NoNegative~RoomBill is negative.,float"`
	ElectricBill        float64  `gorm:"default:0" valid:"NoNegative~ElectricBill is negative.,float"`
	WaterBill           float64  `gorm:"default:0" valid:"NoNegative~WaterBill is negative.,float"`
	DateTimePay         time.Time  `valid:" after_yesterday~DateTimePay must be from today to future."`
	HouseNumber         string	
	VillageNumber       string	
	Lane                string
	Street              string
	SubDistrict         string  
	District            string  
	Province            string 
	PostalCode          string  `valid:"stringlength(5|5)~PostalCode length is not 5 digits.,int"`
	Description         string  `valid:"required~Description is required., stringlength(1|250)"`
	DateTimeResignation time.Time  `valid:" after_yesterday~DateTimeResignation must be from today to future."`
	DateTimeSend        time.Time  `valid:" after_yesterday~DateTimeSend must be from today to future."`//วันที่ขออนุญาตเข้า-ออก
}

type DocumentStatusUpdate struct {
	gorm.Model
	DocumentStatusID uint
	AdminID uint
}


func CreateResignForm(c *gin.Context) {
	var document entity.Document
	var documentType entity.DocumentType
	var documentStatus entity.DocumentStatus
	var user entity.User

	if err := c.ShouldBindJSON(&document); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//validate struct
	if _, err := govalidator.ValidateStruct(document); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Println(document.DocumentTypeID)
	if tx := entity.DB().Where("id = ?", document.DocumentTypeID).First(&documentType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "documentType not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", document.DocumentStatusID).First(&documentStatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "documentStatus not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", document.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// สร้าง document
	u := entity.Document{
		Tel:                 document.Tel,
		HouseNumber:         document.HouseNumber,
		VillageNumber:       document.VillageNumber,
		Lane:                document.Lane,
		Street:              document.Street,
		SubDistrict:         document.SubDistrict,
		District:            document.District,
		Province:            document.Province,
		PostalCode:          document.PostalCode,
		Description:         document.Description,
		DateTimeResignation: document.DateTimeResignation,

		DocumentType:   documentType,
		DocumentStatus: documentStatus,
		UserID: document.UserID,
		User: user,
	}

	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})

}

func CreatePayForm(c *gin.Context) {
	var document entity.Document
	var documentType entity.DocumentType
	var documentStatus entity.DocumentStatus
	var user entity.User

	if err := c.ShouldBindJSON(&document); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//validate struct
	if _, err := govalidator.ValidateStruct(document); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Println(document.DocumentTypeID)
	if tx := entity.DB().Where("id = ?", document.DocumentTypeID).First(&documentType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "documentType not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", document.DocumentStatusID).First(&documentStatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "documentStatus not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", document.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// สร้าง document
	u := entity.Document{
		RoomBill:     document.RoomBill,
		ElectricBill: document.ElectricBill,
		WaterBill:    document.WaterBill,
		DateTimePay:  document.DateTimePay,
		Description:  document.Description,

		DocumentType:   documentType,
		DocumentStatus: documentStatus,
		User:           user,
	}

	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})

}

func CreateDepositForm(c *gin.Context) {
	var document entity.Document
	var documentType entity.DocumentType
	var documentStatus entity.DocumentStatus
	var bank entity.Bank
	var user entity.User

	if err := c.ShouldBindJSON(&document); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//validate struct
	if _, err := govalidator.ValidateStruct(document); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Println(document.DocumentTypeID)
	if tx := entity.DB().Where("id = ?", document.DocumentTypeID).First(&documentType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "documentType not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", document.DocumentStatusID).First(&documentStatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "documentStatus not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", document.BankID).First(&bank); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bank not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", document.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// สร้าง document
	u := entity.Document{
		Tel:         document.Tel,
		BankNumber:  document.BankNumber,
		Description: document.Description,

		DocumentType:   documentType,
		DocumentStatus: documentStatus,
		BankID:         document.BankID,
		Bank:           bank,
		User:           user,
	}

	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})

}

func CreateInOutForm(c *gin.Context) {
	var document entity.Document
	var documentType entity.DocumentType
	var documentStatus entity.DocumentStatus
	var requestInOut entity.RequestInOut
	var user entity.User

	if err := c.ShouldBindJSON(&document); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//validate struct
	if _, err := govalidator.ValidateStruct(document); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Println(document.DocumentTypeID)
	if tx := entity.DB().Where("id = ?", document.DocumentTypeID).First(&documentType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "documentType not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", document.DocumentStatusID).First(&documentStatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "documentStatus not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", document.RequestInOutID).First(&requestInOut); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "requestInOut not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", document.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// สร้าง document
	u := entity.Document{
		DateTimeSend: document.DateTimeSend,
		Description:  document.Description,

		DocumentType:   documentType,
		DocumentStatus: documentStatus,
		RequestInOutID: document.RequestInOutID,
		RequestInOut:   requestInOut,
		User:           user,
	}

	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})

}

func GetAllDocument(c *gin.Context) {
	// create variable for store data as type of TourType array
	var documents []entity.Document

	// get data form database and check error
	if err := entity.DB().Find(&documents).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// response data
	c.JSON(http.StatusOK, gin.H{"data": documents})
}

////////////////////////////////GetByUserID////////////////////////////////
func GetResignFormByUserID(c *gin.Context) {
	var document []entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User.Room").Preload("User").Raw("SELECT * FROM documents WHERE user_id = ? AND document_type_id = 2 AND deleted_at IS NULL", id).Find(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}

func GetPayFormByUserID(c *gin.Context) {
	var document []entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User").Raw("SELECT * FROM documents WHERE user_id = ? AND document_type_id = 1 AND deleted_at IS NULL", id).Find(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}

func GetDepositFormByUserID(c *gin.Context) {
	var document []entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User").Preload("Bank").Raw("SELECT * FROM documents WHERE user_id = ? AND document_type_id = 3 AND deleted_at IS NULL", id).Find(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}

func GetInOutFormByUserID(c *gin.Context) {
	var document []entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User").Preload("RequestInOut").Raw("SELECT * FROM documents WHERE user_id = ? AND document_type_id = 4 AND deleted_at IS NULL", id).Find(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}

////////////////////////////////GetByIDDocument////////////////////////////////
func GetPayFormByID(c *gin.Context) {
	var document entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User").Raw("SELECT * FROM documents WHERE id = ? AND document_type_id = 1 AND deleted_at IS NULL", id).First(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}

func GetResignFormByID(c *gin.Context) {
	var document entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User.Room").Preload("User.Major").Preload("User").Raw("SELECT * FROM documents WHERE id = ? AND document_type_id = 2 AND deleted_at IS NULL", id).First(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}

func GetDepositFormByID(c *gin.Context) {
	var document entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User").Preload("Bank").Raw("SELECT * FROM documents WHERE id = ? AND document_type_id = 3 AND deleted_at IS NULL", id).First(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}

func GetInOutFormByID(c *gin.Context) {
	var document entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User").Preload("RequestInOut").Raw("SELECT * FROM documents WHERE id = ? AND document_type_id = 4 AND deleted_at IS NULL", id).First(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}
//////////////////////////// Delete //////////////////////////////
func DeleteDocument(c *gin.Context) {
	var document entity.Document

	// get id from url
	id := c.Param("id")

	// delete data in database and check error
	// Clauses(clause.Returning{}) is used to return the deleted data
	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&document, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	// response deleted data
	c.JSON(http.StatusOK, gin.H{"data": "cancel your document successfully"})
}

//////////////////////////// Update //////////////////////////////
func UpdateDocument(c *gin.Context) {
	var documentUpdate DocumentUpdate

	// get data from body and check error
	if err := c.ShouldBindJSON(&documentUpdate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//validate struct
	if _, err := govalidator.ValidateStruct(documentUpdate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// update data in database and check error
	if err := entity.DB().Table("documents").Where("id = ?", documentUpdate.ID).Updates(documentUpdate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data
	c.JSON(http.StatusOK, gin.H{"data": "updated your documents successfully"})

}

func UpdateDocumentStatus(c *gin.Context) {
	var documentStatusUpdate DocumentStatusUpdate

	// get data from body and check error
	if err := c.ShouldBindJSON(&documentStatusUpdate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//validate struct
	if _, err := govalidator.ValidateStruct(documentStatusUpdate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// update data in database and check error
	if err := entity.DB().Table("documents").Where("id = ?", documentStatusUpdate.ID).Updates(documentStatusUpdate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data
	c.JSON(http.StatusOK, gin.H{"data": "updated your document status successfully"})

}

/////////////////////////Foradmin////////////////////////////////

func GetAllResignForm(c *gin.Context) { 
	var document []entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User").Raw("SELECT * FROM documents WHERE document_type_id = 2 AND deleted_at IS NULL", id).Find(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}

func GetAllPayForm(c *gin.Context) { 
	var document []entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User").Raw("SELECT * FROM documents WHERE document_type_id = 1 AND deleted_at IS NULL", id).Find(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}

func GetAllDepositForm(c *gin.Context) { 
	var document []entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User").Preload("Bank").Raw("SELECT * FROM documents WHERE document_type_id = 3 AND deleted_at IS NULL", id).Find(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}

func GetAllInOutForm(c *gin.Context) { 
	var document []entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User").Preload("RequestInOut").Raw("SELECT * FROM documents WHERE document_type_id = 4 AND deleted_at IS NULL", id).Find(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}

func GetDocumentByID(c *gin.Context) { 
	var document entity.Document
	id := c.Param("id")
	if err := entity.DB().Preload("DocumentType").Preload("DocumentStatus").Preload("User.Room").Preload("User.Major").Preload("User").Preload("RequestInOut").Preload("Bank").Raw("SELECT * FROM documents WHERE id = ? AND deleted_at IS NULL", id).Find(&document).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": document})
}