package entity

import (
	
	"gorm.io/gorm"
)

type RequestInOut struct{
	gorm.Model
	RequestInOutName 		string

	Documents []Document `gorm:"foreignKey:RequestInOutID"`
	
}