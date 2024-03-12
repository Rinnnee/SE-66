package unit

import (
	"testing"
	"time"

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestNewsValid(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`News valid`, func(t *testing.T) {
		news := entity.News{
			Title:      "News Title",
			Details:    "News Details",
			DatePosted: time.Now(),
			Image:      "valid_image_url",
			Link:       "https://example.com",
			Category: entity.Category{
				CategoryName: "ValidCategoryName",
			},
		}
		ok, err := govalidator.ValidateStruct(news)
		g.Expect(ok).To(BeTrue(), "expected validation to pass, but got error: %s", err)
		g.Expect(err).To(BeNil())
	})
}

func TestNewsTitleRequired(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`Title is required.`, func(t *testing.T) {
		news := entity.News{
			Title:      "",
			Details:    "News Details",
			DatePosted: time.Now(),
			Image:      "valid_image_url",
			Link:       "https://example.com",
			Category: entity.Category{
				CategoryName: "ValidCategoryName",
			},
		}
		ok, err := govalidator.ValidateStruct(news)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Title is required."))
	})
}

func TestNewsDetailsRequired(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`Title is required.`, func(t *testing.T) {
		news := entity.News{
			Title:      "News Title",
			Details:    "",
			DatePosted: time.Now(),
			Image:      "valid_image_url",
			Link:       "https://example.com",
			Category: entity.Category{
				CategoryName: "ValidCategoryName",
			},
		}
		ok, err := govalidator.ValidateStruct(news)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Details is required."))
	})
}

func TestNewsDatePostedValid(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`DatePosted is required.`, func(t *testing.T) {
		news := entity.News{
			Title:   "news Title",
			Details: "news Details",
			Image:   "valid_image_url",
			Link:    "https://example.com",
			Category: entity.Category{
				CategoryName: "ValidCategoryName",
			},
		}
		ok, err := govalidator.ValidateStruct(news)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("DatePosted is required."))
	})
}

func TestNewsImageRequired(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`Image is required.`, func(t *testing.T) {
		news := entity.News{
			Title:      "News Title",
			Details:    "News Details",
			DatePosted: time.Now(),
			Image:      "",
			Link:       "https://example.com",
			Category: entity.Category{
				CategoryName: "ValidCategoryName",
			},
		}
		ok, err := govalidator.ValidateStruct(news)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Image is required."))
	})
}

func TestNewsLinkRequired(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`Invalid URL format.`, func(t *testing.T) {
		news := entity.News{
			Title:      "News Title",
			Details:    "News Details",
			DatePosted: time.Now(),
			Image:      "valid_image_url",
			Link:       "valid_link_url",
			Category: entity.Category{
				CategoryName: "ValidCategoryName",
			},
		}
		ok, err := govalidator.ValidateStruct(news)
		g.Expect(ok).NotTo(BeTrue()) // This line expects validation to fail
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Invalid URL format."))

	})
}

func TestNewsCategoryRequired(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`Category is required.`, func(t *testing.T) {
		news := entity.News{
			Title:      "News Title",
			Details:    "News Details",
			DatePosted: time.Now(),
			Image:      "valid_image_url",
			Link:       "https://example.com",
			Category:   entity.Category{},
		}
		ok, err := govalidator.ValidateStruct(news)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Category is required."))
	})
}
