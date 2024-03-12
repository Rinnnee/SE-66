package entity

import "gorm.io/gorm"

type Major struct {
	gorm.Model
	MajorName string

	Users []User `gorm:"foreignKey:MajorID"`

}
