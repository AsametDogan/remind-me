

import mongoose, { Schema, Document } from 'mongoose';
import { Assignment } from '../interfaces';

interface AssignmentDoc extends Assignment, Document { }

const AssignmentSchema: Schema<AssignmentDoc> = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User schema
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true }, // Reference to Task schema

    startPoint: { type: Number, required: true },
    currentPoint: { type: Number, required: true },
    endPoint: { type: Number, required: false },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },

    isFinished: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    createdDate: { type: Date, default: Date.now }
});

const AssignmentModel = mongoose.model<AssignmentDoc>('Assignment', AssignmentSchema);

export default AssignmentModel;