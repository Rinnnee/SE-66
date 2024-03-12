package entity

import (
	"time"

	"gorm.io/gorm"
)

type ContactLog struct {
	gorm.Model
	Title       string `valid:"required~title is required"`
	IssueType   string `valid:"required~issueType is required"`
	Description string `valid:"required~description is required"`
	TimeAt      time.Time

	UserID *uint
	User   User `gorm:"foreignKey:UserID" valid:"-"`

	AdminResponseID *uint
	AdminResponse   AdminResponse `gorm:"references:id"`
}
