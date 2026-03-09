const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing
} = require('../controllers/listingController')


router.get('/', getAllListings)
router.get('/:id', getListing)
router.post('/', protect, createListing)
router.put('/:id', protect, updateListing)
router.delete('/:id', protect, deleteListing)

module.exports = router