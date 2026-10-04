# Avatar Presentation Resolver

`resolveAvatarPresentation` accepts avatar, era, archetype, mood, crisis state, badges, display context, and visual preferences. It returns asset/fallback references, frame, background, accent, mood, crisis treatment, up to three badges, and meaningful alt text. Missing era art falls back to the base portrait plus CSS layers, so the UI never depends on a missing image.
