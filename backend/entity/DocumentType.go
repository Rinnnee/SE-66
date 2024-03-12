package entity

import (
	
	"gorm.io/gorm"
)

type DocumentType struct{
	gorm.Model
	DocumentTypeName 		string

	Documents []Document `gorm:"foreignKey:DocumentTypeID"`
	
}