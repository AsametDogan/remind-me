

import mongoose, { Schema, Document } from 'mongoose';
import { Progress } from '../interfaces';


interface ProgressDoc extends Progress, Document { }

const ProgressSchema: Schema<ProgressDoc> = new Schema({
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
    point: { type: Number, required: true },
    progressDate: { type: Date, default: Date.now }
});

const ProgressModel = mongoose.model<ProgressDoc>('Progress', ProgressSchema);

export default ProgressModel;