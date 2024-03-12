package unit

import (
	"testing"

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func uintPointer(i uint) *uint {
	return &i
}

func TestFormName(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Name is required`, func(t *testing.T) {
		form := entity.Form{
			Name:        "",
			Description: "",
			FormTypeID:  uintPointer(1),
		}

		ok, err := govalidator.ValidateStruct(form)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name is required"))
	})

	t.Run(`Name is too long`, func(t *testing.T) {
		form := entity.Form{
			Name:        "Test Nameeeeeeeeeeeeeeeeeeeeeeeeee",
			Description: "",
			FormTypeID:  uintPointer(1),
		}

		ok, err := govalidator.ValidateStruct(form)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Name is too long"))
	})

	t.Run(`Correct All`, func(t *testing.T) {
		form := entity.Form{
			Name:        "Test Name",
			Description: "",
			FormTypeID:  uintPointer(1),
		}

		ok, err := govalidator.ValidateStruct(form)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

func TestFormDes(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Description is too long`, func(t *testing.T) {
		form := entity.Form{
			Name:        "Test Name",
			Description: "descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription",
			FormTypeID:  uintPointer(1),
		}

		ok, err := govalidator.ValidateStruct(form)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Description is too long"))
	})

	t.Run(`Correct All`, func(t *testing.T) {
		form := entity.Form{
			Name:        "Test Name",
			Description: "Description",
			FormTypeID:  uintPointer(1),
		}

		ok, err := govalidator.ValidateStruct(form)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

func TestFormTypeID(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`FormTypeID is required`, func(t *testing.T) {
		form := entity.Form{
			Name:        "Test Name",
			Description: "description",
			FormTypeID:  nil,
		}

		ok, err := govalidator.ValidateStruct(form)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("FormTypeID is required"))
	})

	t.Run(`Correct All`, func(t *testing.T) {
		form := entity.Form{
			Name:        "Test Name",
			Description: "Description",
			FormTypeID:  uintPointer(1),
		}

		ok, err := govalidator.ValidateStruct(form)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}
