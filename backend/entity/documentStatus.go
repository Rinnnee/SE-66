package entity

import (
	"gorm.io/gorm"
)

type DocumentStatus struct {
	gorm.Model
	DocumentStatusName string

	Documents []Document `gorm:"foreignKey:DocumentStatusID"`
}
