package unit

import (
	"testing"
	"time"

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestMaintainValid(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Maintain vaild`, func(t *testing.T) {
	maintain := entity.Maintain{
		Title:      "Maintenance Title",
		Details:    "Maintenance Details",
		Image:      "maintenance.jpg",
		Location:   "Maintenance Location",
		Contact:    "0123456789",
		Date:       time.Now(),
		Annotation: "Maintenance Annotation",
		Age:		12,
		MaintainType: entity.MaintainType{
			MaintainTypeName: "ValidTypeName",
		},
	}
	ok, err := govalidator.ValidateStruct(maintain)
	g.Expect(ok).To(BeTrue(), "expected validation to pass, but got error: %s", err)
	g.Expect(err).To(BeNil())
})
}

func TestMaintainTitleRequired(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`กรุณาใส่หัวข้อเรื่อง.`, func(t *testing.T) {
	maintain := entity.Maintain{
		Title:      "",
		Details:    "Maintenance Details",
		Image:      "maintenance.jpg",
		Location:   "Maintenance Location",
		Contact:    "0123456789",
		Date:       time.Now(),
		Annotation: "Maintenance Annotation",
		Age:		12,
		MaintainType: entity.MaintainType{
			MaintainTypeName: "ValidTypeName",
		},
	}
	ok, err := govalidator.ValidateStruct(maintain)
	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณาใส่หัวข้อเรื่อง."))
})
}

func TestMaintainDetailsRequired(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`กรุณาใส่รายละเอียด.`, func(t *testing.T) {
	maintain := entity.Maintain{
		Details:    "",
		Title:      "Maintenance Title",
		Image:      "maintenance.jpg",
		Location:   "Maintenance Location",
		Contact:    "0123456789",
		Date:       time.Now(),
		Annotation: "Maintenance Annotation",
		Age:		12,
		MaintainType: entity.MaintainType{
			MaintainTypeName: "ValidTypeName",
		},
	}
	ok, err := govalidator.ValidateStruct(maintain)
	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณาใส่รายละเอียด."))
})
}

func TestMaintainInvalidLocationRequired(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`กรุณาใส่สถานที่.`, func(t *testing.T) {
	maintain := entity.Maintain{
		Title:      "Maintenance Title",
		Details:    "Maintenance Details",
		Image:      "maintenance.jpg",
		Location:   "",
		Contact:    "0123456789",
		Date:       time.Now(),
		Annotation: "Maintenance Annotation",
		Age:		12,
		MaintainType: entity.MaintainType{
			MaintainTypeName: "ValidTypeName",
		},
	}
	ok, err := govalidator.ValidateStruct(maintain)
	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณาใส่สถานที่."))
})
}
func TestMaintainDateValid(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`กรุณาใส่วันที่แจ้งซ่อม.`, func(t *testing.T) {
	maintain := entity.Maintain{
		Title:      "Maintenance Title",
		Details:    "Maintenance Details",
		Image:      "maintenance.jpg",
		Location:   "Maintenance Location",
		Contact:    "0123456789",
		Annotation: "Maintenance Annotation",
		Age:		12,
		MaintainType: entity.MaintainType{
			MaintainTypeName: "ValidTypeName",
		},
	}
	ok, err := govalidator.ValidateStruct(maintain)
	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณาใส่วันที่แจ้งซ่อม."))
})
}
func TestMaintainInvalidPhoneNumberLength(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`เบอร์โทรศัพท์ไม่ถูกต้อง.`, func(t *testing.T) {
	maintain := entity.Maintain{
		Title:      "Maintenance Title",
		Details:    "Maintenance Details",
		Image:      "maintenance.jpg",
		Location:   "Maintenance Location",
		Contact:    "1235845678901", // Invalid phone number length
		Date:       time.Now(),
		Annotation: "Maintenance Annotation",
		Age:		12,
		MaintainType: entity.MaintainType{
			MaintainTypeName: "ValidTypeName",
		},
	}

	ok, err := govalidator.ValidateStruct(maintain)
	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("เบอร์โทรศัพท์ไม่ถูกต้อง."))
})
}
func TestMaintainAgeValid(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`อายุควรอยู่ระหว่าง1-120.`, func(t *testing.T) {
		// Test case where Age is valid
		maintain := entity.Maintain{
			Title:      "Maintenance Title",
			Details:    "Maintenance Details",
			Image:      "maintenance.jpg",
			Location:   "Maintenance Location",
			Contact:    "0123456789",
			Date:       time.Now(),
			Annotation: "Maintenance Annotation",
			Age:        -1, // Valid age within the range
			MaintainType: entity.MaintainType{
                MaintainTypeName: "ValidTypeName",
            },
		}

		ok, err := govalidator.ValidateStruct(maintain)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("อายุควรอยู่ระหว่าง1-120."))
		
	})
}


func TestMaintainTypeRequired(t *testing.T) {
    g := NewGomegaWithT(t)

    t.Run(`กรุณาเลือกประเภทแจ้งซ่อม.`, func(t *testing.T) {
        maintain := entity.Maintain{
            Title:      "Maintenance Title",
            Details:    "Maintenance Details",
            Image:      "maintenance.jpg",
            Location:   "Maintenance Location",
            Contact:    "0123456789",
            Date:       time.Now(),
            Annotation: "Maintenance Annotation",
            Age:        12,
            MaintainType: entity.MaintainType{
                
            },
        }

        ok, err := govalidator.ValidateStruct(maintain)
        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("กรุณาเลือกประเภทแจ้งซ่อม."))
    })
}
