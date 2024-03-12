package unit

import (
	"fmt"
	"testing"

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestStudentID(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`student_id is required`, func(t *testing.T) {
		user := entity.User{
			StudentID: "", // ผิดตรงนี้
			FirstName: "Unit",
			LastName:  "test",
			Email:     "test@gmail.com",
			Tel:       "0800000000",
			CitizenID: "0000000000000",
		}
	
		ok, err := govalidator.ValidateStruct(user)
	
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	
		g.Expect(err.Error()).To(Equal("StudentID is required"))
	})
	

	t.Run(`student_id pattern is not true`, func(t *testing.T) {
		user := entity.User{
			StudentID: "K5000000", // ผิดตรงนี้
			FirstName: "Unit",
			LastName:  "test",
			Email:     "test@gmail.com",
			Tel:       "0800000000",
			CitizenID: "0000000000000",
			
		}
	
		ok, err := govalidator.ValidateStruct(user)
	
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	
		g.Expect(err.Error()).To(Equal(fmt.Sprintf("StudentID: %s does not validate as matches(^[BMD]\\d{7}$)", user.StudentID)))
	})

	t.Run(`student_id is valid`, func(t *testing.T) {
		user := entity.User{
			StudentID: "B5000000",
			FirstName: "Unit",
			LastName:  "test",
			Email:     "test@gmail.com",
			Tel:       "0800000000",
			CitizenID: "0000000000000",

		}
	
		// ทดสอบว่าไม่มี error ใน validation
		ok, err := govalidator.ValidateStruct(user)
	
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
	
	
	
	
	
}

func TestTelNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`tel_number check 10 digit`, func(t *testing.T) {
		user := entity.User{
			StudentID: "B5000000",
			FirstName: "Unit",
			LastName:  "test",
			Email:     "test@gmail.com",
			Tel:       "12345678901", //อันนี้ผิด
			CitizenID: "0000000000000",
		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal(fmt.Sprintf("Tel: %s does not validate as stringlength(10|10)", user.Tel)))

	})
}

func TestCitizenID(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`citizen_id is required`, func(t *testing.T) {
		user := entity.User{
			StudentID: "B6401880",
			FirstName: "Unit",
			LastName:  "test",
			Email:     "test@gmail.com",
			Tel:       "0800000000",
			CitizenID: "", // ผิดตรงนี้

		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("CitizenID is required"))
	})

	t.Run(`citizen_id pattern is not true`, func(t *testing.T) {
		user := entity.User{
			StudentID: "B5000000",
			FirstName: "Unit",
			LastName:  "test",
			Email:     "test@gmail.com",
			Tel:       "0800000000",
			CitizenID: "0000000000003330", // ผิดตรงนี้
		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(fmt.Sprintf("CitizenID: %s does not validate as stringlength(13|13)", user.CitizenID)))
	})

	t.Run(`citizen_id is valid`, func(t *testing.T) {
		user := entity.User{
			StudentID: "B5000000",
			FirstName: "Unit",
			LastName:  "test",
			Email:     "test@gmail.com",
			Tel:       "0800000000",
			CitizenID: "1234567890123",
		}

		ok, err := govalidator.ValidateStruct(user)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})
}
