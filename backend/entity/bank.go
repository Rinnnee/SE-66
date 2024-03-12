package entity

import (
	
	"gorm.io/gorm"
)

type Bank struct{
	gorm.Model
	BankName 		string

	Documents []Document `gorm:"foreignKey:BankID"`
	
}