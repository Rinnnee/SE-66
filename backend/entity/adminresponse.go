package entity

import (
	"time"

	"gorm.io/gorm"
)

type AdminResponse struct {
	gorm.Model
	Message   string
	TimeStamp time.Time

	AdminID *uint
	Admin   Admin `gorm:"references:id"`
}
