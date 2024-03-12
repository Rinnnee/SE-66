package unit

import (
	// "fmt"
	"testing"
	"time"

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPayment(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Slip is required`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Now(), 			
			PaymentEndDate:time.Now() ,
			Slip: "adghkl", //ผิด
			
		}
	
		ok, err := govalidator.ValidateStruct(payment)
	
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	
		g.Expect(err.Error()).To(Equal("Slip is required"))
	})


	t.Run(`PaymentDate is required`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Now().AddDate(-1, 0, -1), //ผิด			,
			PaymentEndDate:time.Now() ,
			Slip: "C25B406A-3BF0-4178-AD69-D35C3EE9C3CD.JPG",
			
		}
	
		ok, err := govalidator.ValidateStruct(payment)
	
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	
		g.Expect(err.Error()).To(Equal("PaymentDate must be from today to future;Slip is required"))
	})
	


	t.Run(`PaymentEndDate is required`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Now(), //ผิด			,
			PaymentEndDate:time.Now().AddDate(-1, 0, -1) ,
			Slip: "C25B406A-3BF0-4178-AD69-D35C3EE9C3CD.JPG",
			
		}
	
		ok, err := govalidator.ValidateStruct(payment)
	
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	
		g.Expect(err.Error()).To(Equal("PaymentEndDate must be from today to future;Slip is required"))
	})

}

// func TestSlip(t *testing.T) {

// 	g := NewGomegaWithT(t)

// 	t.Run(`Slip is required`, func(t *testing.T) {
// 		payment := entity.Payment{
// 			PaymentDate: time.Now(), 			
// 			PaymentEndDate:time.Now() ,
// 			Slip: "adghkl", //ผิด
			
// 		}
	
// 		ok, err := govalidator.ValidateStruct(payment)
	
// 		g.Expect(ok).NotTo(BeTrue())
// 		g.Expect(err).NotTo(BeNil())
	
// 		g.Expect(err.Error()).To(Equal("Slip is required"))
// 	})
// }