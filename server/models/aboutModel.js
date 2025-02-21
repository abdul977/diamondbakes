import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
    enum: ['Users', 'Clock', 'Award', 'Heart'] // Lucide icon names
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const aboutSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true
  },
  introduction: {
    type: String,
    required: true
  },
  features: [featureSchema],
  story: {
    title: {
      type: String,
      required: true
    },
    content: [{
      type: String,
      required: true
    }],
    images: [{
      url: {
        type: String,
        required: true
      },
      alt: {
        type: String,
        required: true
      }
    }]
  },
  commitment: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
}, { timestamps: true });

// Ensure only one About document exists
aboutSchema.pre('save', async function(next) {
  const About = this.constructor;
  if (this.isNew) {
    const count = await About.countDocuments();
    if (count > 0) {
      const err = new Error('Only one About document can exist');
      next(err);
    }
  }
  next();
});

const About = mongoose.model('About', aboutSchema);

export default About;
