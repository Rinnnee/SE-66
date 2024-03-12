package entity

import "gorm.io/gorm"

type FormChoice struct {
	gorm.Model
	A string
	B string
	C string
	D string

	// form type id
	FormTopicID *uint
	FormTopic   FormTopic `gorm:"references:id"`
}
