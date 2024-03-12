package entity

import "gorm.io/gorm"

type FormTopic struct {
	gorm.Model
	Topic string

	// form type id
	FormTopicTypeID *uint
	FormTopicType   FormTopicType `gorm:"references:id"`

	// form type id
	FormID *uint
	Form   Form `gorm:"references:id"`

	FormChoice []FormChoice `gorm:"foreignKey:FormTopicID"`
}
