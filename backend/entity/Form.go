package entity

import "gorm.io/gorm"

type Form struct {
	gorm.Model
	Name        string `valid:"required~Name is required, stringlength(0|30)~Name is too long"`
	Description string `valid:"stringlength(0|100)~Description is too long"`

	// addmin id
	AdminID *uint
	Admin   Admin `gorm:"references:id"`

	// form type id
	FormTypeID *uint    `valid:"required~FormTypeID is required"`
	FormType   FormType `gorm:"references:id"`

	// form status id
	FormStatusID *uint
	FormStatus   FormStatus `gorm:"references:id"`

	FormTopics []FormTopic `gorm:"foreignKey:FormID"`
}
