package entity

import "gorm.io/gorm"

type FormTopicType struct {
	gorm.Model
	FormTopicType string

	FormTopics []FormTopic `gorm:"foreignKey:FormTopicTypeID"`
}
