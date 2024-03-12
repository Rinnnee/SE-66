package entity

import "gorm.io/gorm"

type FormType struct {
	gorm.Model
	FormType string

	Forms []Form `gorm:"foreignKey:FormTypeID"`
}
