const Listing = require('../models/Listing')
const User = require('../models/User')

//Get listinng(all/single)
// Get all listings - newest first, with search and pagination
exports.getAllListings = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, tab } = req.query

    // Build filter for search
    const filter = {}
    if (search) {
      const searchRegex = new RegExp(search, 'i')
      filter.$or = [
        { title: searchRegex },
        { location: searchRegex },
        { description: searchRegex }
      ]
    }

    // Filter by tab if needed
    if (tab === 'liked') {
      filter.likes = req.user.id
    } else if (tab === 'saved') {
      const user = await User.findById(req.user.id)
      filter._id = { $in: user.savedListings }
    }

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    const [listings, total] = await Promise.all([
      Listing.find(filter)
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Listing.countDocuments(filter)
    ])

    res.status(200).json({
      listings,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
        limit: limitNum
      }
    })
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

    const { title, location, imageUrl, description, price } = req.body
    const updateData = {}
    if (title !== undefined) updateData.title = title
    if (location !== undefined) updateData.location = location
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl
    if (description !== undefined) updateData.description = description
    if (price !== undefined) updateData.price = price

    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
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

// Like / Unlike a listing
exports.toggleLike = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' })
    }

    const userId = req.user.id
    const isLiked = listing.likes.includes(userId)

    if (isLiked) {
      // Unlike
      listing.likes = listing.likes.filter(id => id.toString() !== userId)
    } else {
      // Like
      listing.likes.push(userId)
    }

    await listing.save()

    res.status(200).json({
      message: isLiked ? 'Listing unliked' : 'Listing liked',
      likesCount: listing.likes.length,
      isLiked: !isLiked
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Save / Unsave a listing
exports.toggleSave = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' })
    }

    const user = await User.findById(req.user.id)
    const isSaved = user.savedListings.includes(req.params.id)

    if (isSaved) {
      // Unsave
      user.savedListings = user.savedListings.filter(id => id.toString() !== req.params.id)
    } else {
      // Save
      user.savedListings.push(req.params.id)
    }

    await user.save()

    res.status(200).json({
      message: isSaved ? 'Listing unsaved' : 'Listing saved',
      isSaved: !isSaved
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get saved listings for current user
exports.getSavedListings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'savedListings',
        populate: { path: 'createdBy', select: 'name email' }
      })

    res.status(200).json({ listings: user.savedListings })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get liked listings for current user
exports.getLikedListings = async (req, res) => {
  try {
    const listings = await Listing.find({ likes: req.user.id })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({ listings })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get users who liked a listing (Author only)
exports.getListingLikes = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('likes', 'name email')

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' })
    }

    if (listing.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view likes' })
    }

    res.status(200).json({ likes: listing.likes })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}