const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  toggleLike,
  toggleSave,
  getSavedListings
} = require('../controllers/listingController')


router.get('/', getAllListings)
router.get('/saved', protect, getSavedListings)
router.get('/:id', getListing)
router.post('/', protect, createListing)
router.put('/:id', protect, updateListing)
router.delete('/:id', protect, deleteListing)
router.put('/:id/like', protect, toggleLike)
router.put('/:id/save', protect, toggleSave)

module.exports = router