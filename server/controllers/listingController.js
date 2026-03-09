const Listing = require('../models/Listing')

//Get listinng(all/single)
// Get all listings - newest first
exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({ listings })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get single listing
exports.getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('createdBy', 'name email')

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' })
    }

    res.status(200).json({ listing })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Create listing
exports.createListing = async (req, res) => {
  try {
    const { title, location, imageUrl, description, price } = req.body

    const listing = await Listing.create({
      title,
      location,
      imageUrl,
      description,
      price: price || null,
      createdBy: req.user.id
    })

    res.status(201).json({ message: 'Listing created successfully', listing })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Update listing
exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' })
    }

    if (listing.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this listing' })
    }

    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.status(200).json({ message: 'Listing updated successfully', listing: updated })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Delete listing
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' })
    }


    // Check if user owns the listing
    if (listing.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' })
    }

    await Listing.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'Listing deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}