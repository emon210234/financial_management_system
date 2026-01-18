import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'financial_wisdom',
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index to efficiently find active quotes
quoteSchema.index({ isActive: 1, expiresAt: 1 });

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;
