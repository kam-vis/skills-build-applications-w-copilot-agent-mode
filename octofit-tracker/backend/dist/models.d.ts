import mongoose, { Schema } from 'mongoose';
export type ResourceName = 'users' | 'teams' | 'activities' | 'leaderboard' | 'workouts';
export type UserRecord = {
    name: string;
    email: string;
    fitnessLevel?: string;
};
export type TeamRecord = {
    name: string;
    members?: number;
    sport?: string;
};
export type ActivityRecord = {
    userId: mongoose.Types.ObjectId | string;
    type: string;
    durationMinutes?: number;
    calories?: number;
    notes?: string;
};
export type LeaderboardRecord = {
    userId: mongoose.Types.ObjectId | string;
    name: string;
    score?: number;
};
export type WorkoutRecord = {
    title: string;
    difficulty?: string;
    durationMinutes?: number;
    focusArea?: string;
};
export type ResourceRecord = UserRecord | TeamRecord | ActivityRecord | LeaderboardRecord | WorkoutRecord;
export declare const User: mongoose.Model<UserRecord, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, UserRecord, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<UserRecord & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<UserRecord, mongoose.Model<UserRecord, any, any, any, any, any, UserRecord>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserRecord, mongoose.Document<unknown, {}, UserRecord, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<UserRecord & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: mongoose.SchemaDefinitionProperty<string, UserRecord, mongoose.Document<unknown, {}, UserRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<UserRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: mongoose.SchemaDefinitionProperty<string, UserRecord, mongoose.Document<unknown, {}, UserRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<UserRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    fitnessLevel?: mongoose.SchemaDefinitionProperty<string | undefined, UserRecord, mongoose.Document<unknown, {}, UserRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<UserRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, UserRecord>, UserRecord>;
export declare const Team: mongoose.Model<TeamRecord, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, TeamRecord, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<TeamRecord & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<TeamRecord, mongoose.Model<TeamRecord, any, any, any, any, any, TeamRecord>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, TeamRecord, mongoose.Document<unknown, {}, TeamRecord, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<TeamRecord & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: mongoose.SchemaDefinitionProperty<string, TeamRecord, mongoose.Document<unknown, {}, TeamRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<TeamRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    members?: mongoose.SchemaDefinitionProperty<number | undefined, TeamRecord, mongoose.Document<unknown, {}, TeamRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<TeamRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    sport?: mongoose.SchemaDefinitionProperty<string | undefined, TeamRecord, mongoose.Document<unknown, {}, TeamRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<TeamRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, TeamRecord>, TeamRecord>;
export declare const Activity: mongoose.Model<ActivityRecord, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, ActivityRecord, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<ActivityRecord & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<ActivityRecord, mongoose.Model<ActivityRecord, any, any, any, any, any, ActivityRecord>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ActivityRecord, mongoose.Document<unknown, {}, ActivityRecord, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<ActivityRecord & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    userId?: mongoose.SchemaDefinitionProperty<string | mongoose.Types.ObjectId, ActivityRecord, mongoose.Document<unknown, {}, ActivityRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ActivityRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: mongoose.SchemaDefinitionProperty<string, ActivityRecord, mongoose.Document<unknown, {}, ActivityRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ActivityRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    durationMinutes?: mongoose.SchemaDefinitionProperty<number | undefined, ActivityRecord, mongoose.Document<unknown, {}, ActivityRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ActivityRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    calories?: mongoose.SchemaDefinitionProperty<number | undefined, ActivityRecord, mongoose.Document<unknown, {}, ActivityRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ActivityRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    notes?: mongoose.SchemaDefinitionProperty<string | undefined, ActivityRecord, mongoose.Document<unknown, {}, ActivityRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ActivityRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, ActivityRecord>, ActivityRecord>;
export declare const LeaderboardEntry: mongoose.Model<LeaderboardRecord, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, LeaderboardRecord, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<LeaderboardRecord & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<LeaderboardRecord, mongoose.Model<LeaderboardRecord, any, any, any, any, any, LeaderboardRecord>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, LeaderboardRecord, mongoose.Document<unknown, {}, LeaderboardRecord, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<LeaderboardRecord & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    userId?: mongoose.SchemaDefinitionProperty<string | mongoose.Types.ObjectId, LeaderboardRecord, mongoose.Document<unknown, {}, LeaderboardRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<LeaderboardRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: mongoose.SchemaDefinitionProperty<string, LeaderboardRecord, mongoose.Document<unknown, {}, LeaderboardRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<LeaderboardRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    score?: mongoose.SchemaDefinitionProperty<number | undefined, LeaderboardRecord, mongoose.Document<unknown, {}, LeaderboardRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<LeaderboardRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, LeaderboardRecord>, LeaderboardRecord>;
export declare const Workout: mongoose.Model<WorkoutRecord, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, WorkoutRecord, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<WorkoutRecord & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<WorkoutRecord, mongoose.Model<WorkoutRecord, any, any, any, any, any, WorkoutRecord>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, WorkoutRecord, mongoose.Document<unknown, {}, WorkoutRecord, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<WorkoutRecord & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: mongoose.SchemaDefinitionProperty<string, WorkoutRecord, mongoose.Document<unknown, {}, WorkoutRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<WorkoutRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    difficulty?: mongoose.SchemaDefinitionProperty<string | undefined, WorkoutRecord, mongoose.Document<unknown, {}, WorkoutRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<WorkoutRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    durationMinutes?: mongoose.SchemaDefinitionProperty<number | undefined, WorkoutRecord, mongoose.Document<unknown, {}, WorkoutRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<WorkoutRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    focusArea?: mongoose.SchemaDefinitionProperty<string | undefined, WorkoutRecord, mongoose.Document<unknown, {}, WorkoutRecord, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<WorkoutRecord & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, WorkoutRecord>, WorkoutRecord>;
//# sourceMappingURL=models.d.ts.map