package entity

import (
	
	"gorm.io/gorm"
)

type RoomType struct {
	gorm.Model
	RoomTypeName string

	Rooms []Room `gorm:"foreignKey:RoomTypeID"`
}