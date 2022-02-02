const mongoose = require("mongoose");
const validator = require("validator");

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter ticket name"],
    },
    description: {
        type: String,
        required: [true, "Please enter ticket description"],
    },
    state: {
        type: String,
        enum: ["pending", "in_progress", "in_review", "done"],
        default: "pending",
    },
    assigned_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    classification: {
        type: Schema.Types.ObjectId,
        ref: 'Classification'
    },
    can_staff_complete: {
        type: Boolean,
        default: false,
        select: false,
    }

});

// title = models.CharField(max_length=200, null=True)
// description = models.CharField(max_length=2000, null=True)
priority = models.ForeignKey(Priority, on_delete = models.CASCADE)
// state = models.IntegerField(default=0)
board = models.ManyToManyField(Board)
// assigned_group = models.ManyToManyField(Group)
// assigned_user = models.ManyToManyField(
// related_name = 'assigned_user', to = Account)
ticket_supervisors = models.ManyToManyField(
    related_name = 'ticket_supervisors', to = Account)
// classification = models.ForeignKey(
// Classification, on_delete = models.CASCADE)
can_staff_complete = models.BooleanField()