package entity

import "gorm.io/gorm"

type FormStatus struct {
	gorm.Model
	FormStatus string

	Forms []Form `gorm:"foreignKey:FormStatusID"`
}