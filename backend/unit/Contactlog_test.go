package unit

import (
	"strings"
	"testing"
	"time"

	"github.com/NPimtrll/team12/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestTitle(t *testing.T) {
	UserID := uint(1)


	g := NewGomegaWithT(t)

	t.Run(`title is required`, func(t *testing.T) {
		contactlog := entity.ContactLog{
            UserID : &UserID ,
			Title: "", // ผิดตรงนี้
			IssueType: "Unit",
			Description:  "test",
			TimeAt: time.Now()   ,
		}
	
		ok, err := govalidator.ValidateStruct(contactlog)
	
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	
		g.Expect(err.Error()).To(Equal("title is required"))

	})
	
}

func TestDescription(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`description is required`, func(t *testing.T) {
		contactlog := entity.ContactLog{
			Title: "Test", 
			IssueType: "Unit",
			Description:  "", // ผิดตรงนี้
			TimeAt: time.Now(),
		}
	
		ok, err := govalidator.ValidateStruct(contactlog)
	
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	    g.Expect(strings.Contains(err.Error(), "description is required")).To(BeTrue())
	})
	
	
}

func TestIssueType(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`issueType is required`, func(t *testing.T) {
		contactlog := entity.ContactLog{
			Title: "Test", 
			IssueType: "", // ผิดตรงนี้
			Description:  "test",
			TimeAt: time.Now()   ,
		}
	
		ok, err := govalidator.ValidateStruct(contactlog)
	
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	
		g.Expect(strings.Contains(err.Error(), "issueType is required")).To(BeTrue())
	})
	
}