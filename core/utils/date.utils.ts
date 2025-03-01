import { StringUtils } from "@/core/utils/string.utils";

export class DateUtils {
	public static getDayName(): string {
		const today = new Date();
		const day = today.toLocaleDateString("pt-BR", { weekday: "long" });
		return StringUtils.capitalize(day);
	}
}