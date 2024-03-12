package controller

import (
	"net/http"

	"github.com/NPimtrll/team12/entity"
	"github.com/gin-gonic/gin"
)

// GET /category/:id
func GetCategory(c *gin.Context) {
	var category entity.Category
	categoryID := c.Param("id")

	// Retrieve the Category record with the specified ID
	if err := entity.DB().Preload("Newses").First(&category, categoryID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	// Return a JSON response with the retrieved Category data
	c.JSON(http.StatusOK, gin.H{"data": category})
}

// GET /categories
func GetAllCategories(c *gin.Context) {
    // Declare a slice variable to hold all Category entities
    var categories []entity.Category

    // Retrieve all Category records from the database
    if err := entity.DB().Preload("Newses").Find(&categories).Error; err != nil {
        // If an error occurs, return a JSON response with an error message and a 500 status code
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve categories"})
        return
    }

    // If categories are found, return a JSON response with the retrieved category data and a 200 status code
    c.JSON(http.StatusOK, gin.H{"data": categories})
}
