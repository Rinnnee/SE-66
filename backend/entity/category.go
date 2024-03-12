package entity

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	CategoryName string

	Newses []News `gorm:"foreignKey:CategoryID"`
}