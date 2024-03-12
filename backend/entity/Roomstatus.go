package entity

import (
	
	"gorm.io/gorm"
)

type RoomStatus struct {
	gorm.Model
	RoomStatusName string

	Rooms []Room `gorm:"foreignKey:RoomStatusID"`
}