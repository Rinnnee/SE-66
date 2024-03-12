package entity

import (
	"time"

	"gorm.io/gorm"
	"github.com/asaskevich/govalidator"
)

func init() {
	govalidator.TagMap["url"] = govalidator.Validator(func(str string) bool {
		return govalidator.IsURL(str)
	})
}

type News struct {
	gorm.Model
	Title      string    `valid:"required~Title is required."`
	Details    string    `valid:"required~Details is required."`
	DatePosted time.Time `valid:"required~DatePosted is required."`
	Image      string    `valid:"required~Image is required."`
	Link       string    `valid:"required,url~Invalid URL format."`
	CategoryID *uint
	Category   Category `gorm:"references:id" valid:"required~Category is required."`
	AdminID    *uint
	Admin      Admin `gorm:"references:id"`
}
